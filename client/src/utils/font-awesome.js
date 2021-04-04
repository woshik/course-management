import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faTachometerAlt,
  faUser,
  faCopy,
  faEdit,
  faTrashAlt,
  faArrowUp,
  faArrowDown,
  faAddressBook,
  faUserGraduate,
  faCalendarAlt,
  faBookOpen,
  faWrench,
  faRedo,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(
  faBars,
  faTachometerAlt,
  faUser, faCopy,
  faEdit,
  faTrashAlt,
  faArrowUp,
  faArrowDown,
  faAddressBook,
  faUserGraduate,
  faCalendarAlt,
  faBookOpen,
  faWrench,
  faRedo,
);

Vue.component('font-awesome-icon', FontAwesomeIcon);
