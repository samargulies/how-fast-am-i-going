<template>
  <div class="set-location">
    <div class="">
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
      <div id="location-prompt" v-if="setLocationOpen">
          <label for="address" class="visuallyhidden">{{ $t('address.label') }}</label>
          <div class="address-search">
             <Autocomplete
              :items="autosuggestions"
              v-model="item"
              @update-items="updateItems"
              @item-selected="setLocation"
              :get-label="getLabel"
              :component-item="template"
              :auto-select-one-item="false"
              ref='search'
              :input-attrs="{
                placeholder: $t('address.placeholder'),
                id: 'address',
                autocomplete: 'off'
              }" />
          <a id="cancel-search"
            class="button"
            @click.prevent="toggleOpen">
            {{ $t('address.cancel') }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Vue from 'vue';
import { mapState } from 'vuex';
import Autocomplete from 'v-autocomplete';
import { encodeUrlTitle } from '@/helpers';
import bingMaps from '@/bingMaps';

export default {
  components: { Autocomplete },
  data() {
    return {
      autosuggestions: [],
      item: null,
    };
  },
  computed: {
    ...mapState(['setLocationOpen', 'location', 'useFeet']),
    hideUnitSelection() {
      return this.$t('units.hide-selection') === 'true';
    },
    template() {
      return Vue.component('autosuggestion', {
        props: ['item'],
        template: '<span>{{ item.name }}</span>',
      });
    },
  },
  methods: {
    setLocation() {
      this.autosuggestions = [];
      if (!this.item) {
        return;
      }
      this.$router.push({
        name: 'location',
        params: {
          latitude: `${this.item.point.coordinates[0]}`,
          longitude: `${this.item.point.coordinates[1]}`,
          title: encodeUrlTitle(this.item.address.formattedAddress),
        },
      });
    },
    getLabel(item) {
      return item.name;
    },
    updateItems(query) {
      if (query.length < 3) {
        this.autosuggestions = [];
        return;
      }
      bingMaps.getAutosuggestions({
        query,
        latitude: this.$store.state.location.latitude,
        longitude: this.$store.state.location.longitude,
        accuracy: this.$store.state.location.accuracy,
      }).then((results) => {
        this.autosuggestions = results;
      });
    },
    toggleOpen() {
      this.$store.dispatch('setLocationOpen', !this.setLocationOpen)
        .then(() => {
          if (this.setLocationOpen) {
            document.getElementById('address').focus();
          }
        });
    },
    toggleUnits() {
      this.$store.dispatch('setUseFeet', !this.useFeet);
    },
  },
};
</script>
