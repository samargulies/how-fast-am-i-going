<template>
  <div class="set-location">
    <div class="metadata">
      <div id="location">
        <span class="value">{{ location.title }}</span>
        <div class="coordinates"></div>
      </div>
      <div class="settings">
        <a id="choose-units" class="button" v-if="!hideUnitSelection" @click="toggleUnits">
          <span :class="['units', 'units--feet', useFeet ? 'units-selected' : '']">
            {{ $t('units.feet') }}
          </span>
          <span :class="['units', 'units--meters', !useFeet ? 'units-selected' : '']">
            {{ $t('units.meters') }}
          </span>
        </a>
        <a id="change-location" class="button" @click="toggleOpen">{{ $t('change-location') }}</a>
      </div>
    </div>

    <transition name="slide">
      <form id="location-prompt" v-if="setLocationOpen" @submit.prevent="getSuggestions(true)">
          <label for="address" class="visuallyhidden">{{ $t('address.label') }}</label>
          <div class="address-search">
            <input id="address"
              autocomplete="off"
              :placeholder="$t('address.placeholder')"
              v-model="query"
              :tabindex="1"
              ref="search"
              @keydown.down.stop="focusSuggestion(0)">
              <transition name="slide">
                <div class="suggestions" v-if="autosuggestions.length > 0" ref="suggestions">
                  <div class="suggestion"
                    v-for="(suggestion, index) in autosuggestions"
                    :key="suggestion.point.coordinates[0]"
                    :tabindex="index + 2"
                    @click="setLocation(suggestion)"
                    @keydown.enter="setLocation(suggestion)"
                    @keydown.up.stop="focusSuggestion(index - 1)"
                    @keydown.down.stop="focusSuggestion(index + 1)">
                      {{ suggestion.name }}
                  </div>
                </div>
              </transition>
          <input id="cancel-search" type="button" class="button" @click.prevent="toggleOpen" :value="$t('address.cancel')">
        </div>
      </form>
    </transition>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { encodeUrlTitle } from '@/helpers';
import { getAutosuggestions } from '@/bingMaps';

export default {
  data() {
    return {
      query: '',
      autosuggestions: [],
    };
  },
  computed: {
    ...mapState(['setLocationOpen', 'location', 'useFeet']),
    hideUnitSelection() {
      return this.$t('units.hide-selection') === 'true';
    },
  },
  methods: {
    setLocation(data) {
      console.log(data);

      this.$router.push({
        name: 'location',
        params: {
          latitude: `${data.point.coordinates[0]}`,
          longitude: `${data.point.coordinates[1]}`,
          title: encodeUrlTitle(data.address.formattedAddress),
        },
      });
    },
    moveCursorToEnd(el) {
      if (typeof el.selectionStart === 'number') {
        el.selectionStart = el.selectionEnd = el.value.length;
      } else if (typeof el.createTextRange !== 'undefined') {
        el.focus();
        const range = el.createTextRange();
        range.collapse(false);
        range.select();
      }
    },
    focusSuggestion(index) {
      if (typeof index === 'number') {
        if (index === -1) {
          this.$refs.search.focus();
          this.moveCursorToEnd(this.$refs.search);
        } else if (index < this.autosuggestions.length) {
          this.focusIndex = index;
          this.$refs.suggestions.children[index].focus();
        } else {
          this.focusIndex = null;
        }
      }
    },
    getSuggestions(force = false) {
      const searchQuery = this.query;
      if (searchQuery.length > 4 || force) {
        getAutosuggestions({
          query: searchQuery,
          latitude: this.$store.state.location.latitude,
          longitude: this.$store.state.location.longitude,
          accuracy: this.$store.state.location.accuracy,
        }).then((results) => {
          const firstResult = results[0];
          // on return accept a high confidence result, otherwise show options
          if (force && firstResult.confidence === 'High') {
            this.setLocation(firstResult);
          } else if (this.query === searchQuery) {
            this.autosuggestions = results;
          }
        });
      } else {
        this.autosuggestions = [];
      }
    },
    toggleOpen() {
      this.$store.dispatch('setLocationOpen', !this.setLocationOpen);
    },
    toggleUnits() {
      this.$store.dispatch('setUseFeet', !this.useFeet);
    },
  },
  watch: {
    query() {
      this.getSuggestions();
    },
  },
};
</script>
