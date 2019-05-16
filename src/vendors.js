import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import axios from 'axios';
import env from './config/env';
if(location.protocol=='http:'&&env&&env=='pro'){
  let loc_url = location.href.replace('http:','https:');
  location.replace(loc_url);
}