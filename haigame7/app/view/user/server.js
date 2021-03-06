'use strict';

export const  key = '@lussatech:session';
export const host = 'http://api.haigame7.com/v1';
export default {
  auth: {
    login: function (data) {
      let url = `${host}/auth/login`,
          opt = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };

      return fetch(url, opt);
    },
    register: function (data) {
      let url = `${host}/auth/register`,
          opt = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };

      return fetch(url, opt);
    },
    forget: function (data) {
      let url = `${host}/auth/forget`,
          opt = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };

      return fetch(url, opt);
    },
    reset: function (data) {
      let url = `${host}/auth/reset`,
          opt = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };

      return fetch(url, opt);
    },
    registerVertifyCode: function (data) {
      let url = `${host}/user/verifycode1?accesstoken=ABC12abc`,
          opt = {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          };

      return fetch(url, opt);
    },

  }
};
