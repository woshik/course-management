import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faTachometerAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faBars, faTachometerAlt, faUser);

Vue.component('font-awesome-icon', FontAwesomeIcon);
