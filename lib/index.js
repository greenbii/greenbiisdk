"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var axios = require('axios');

var GB_API_SERVER = "http://localhost:8087/sdk/v1"; //"https://api.greenbii.com/v1"
//const isBrowser = require('./check_browser');

var greenbii = /*#__PURE__*/function () {
  function greenbii() {
    _classCallCheck(this, greenbii);

    _defineProperty(this, "status", false);

    _defineProperty(this, "statusMessage", null);

    _defineProperty(this, "business_details", null);

    _defineProperty(this, "current_user_details", null);

    _defineProperty(this, "access_token", null);
  }

  _createClass(greenbii, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var _this = this;

        var dt;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                //console.log(localStorage.length);
                console.log(_typeof(options.access_token));
                _context.prev = 1;

                if (!(localStorage === undefined || window === undefined)) {
                  _context.next = 5;
                  break;
                }

                this.statusMessage = {
                  code: "UNSUPPORTED_PLATFORM",
                  message: "Only browser platform is support for this SDK at the moment"
                };
                return _context.abrupt("return", false);

              case 5:
                _context.next = 11;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](1);
                this.statusMessage = {
                  code: "UNSUPPORTED_PLATFORM",
                  message: "Only browser platform is support for this SDK at the moment"
                };
                return _context.abrupt("return", false);

              case 11:
                console.log(options);

                if (!(typeof options.api_key === 'undefined')) {
                  _context.next = 15;
                  break;
                }

                this.statusMessage = {
                  code: "NO_API_KEY",
                  message: "API key no provided, unable to initialize Greenbii App Module"
                };
                return _context.abrupt("return", false);

              case 15:
                if (!(typeof options.access_token === 'undefined')) {
                  _context.next = 18;
                  break;
                }

                this.statusMessage = {
                  code: "NO_ACCESS_TOKEN",
                  message: "No access token is available for this request"
                };
                return _context.abrupt("return", false);

              case 18:
                if (!(localStorage.getItem("__gb_user") !== null)) {
                  _context.next = 24;
                  break;
                }

                dt = JSON.parse(localStorage.getItem("__gb_user"));
                this.access_token = dt.access_token;
                this.current_user_details = dt.user;
                this.business_details = dt.business_details;
                return _context.abrupt("return", true);

              case 24:
                return _context.abrupt("return", axios({
                  url: GB_API_SERVER + "/initialize",
                  method: "POST",
                  data: {
                    apiKey: options.api_key,
                    access_token: options.access_token
                  }
                }).then(function (response) {
                  if (response.data.status === true) {
                    //it means the request was successful, notify the user user
                    _this.business_details = response.data.data.business_details;
                    _this.current_user_details = response.data.data.user;
                    _this.access_token = response.data.data.access_token; //write the content of the file in storage

                    //write the content of the file in storage
                    localStorage.setItem("__gb_user", JSON.stringify(response.data.data));
                    return true;
                  } else {
                    return false;
                  }
                })["catch"](function (error) {
                  console.log(error);
                  return false;
                }));

              case 25:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 7]]);
      }));

      function init(_x) {
        return _init.apply(this, arguments);
      }

      return init;
    }() //initialize gb app integration module here

  }, {
    key: "getCurrentUser",
    value: function getCurrentUser() {
      return this.current_user_details;
    }
    /**
     * Returns the business details of the currently logged in user
     * @returns {business_name|string, business_description|string}
     */

  }, {
    key: "getCurrentBusinessData",
    value: function getCurrentBusinessData() {
      return this.business_details;
    }
    /**
     * Returns status message for every failed or successful
     * @returns {error|string, error_message|string}
     */

  }, {
    key: "getStatusMessage",
    value: function getStatusMessage() {
      return this.statusMessage;
    }
    /**
     * Retrieves the contacts this user has access to
     * provided your app is granted explicit permission
     */

  }, {
    key: "getUserContacts",
    value: function getUserContacts() {
      if (this.access_token !== null) {
        return axios({
          url: GB_API_SERVER + "/user-contacts",
          method: "POST",
          data: {
            access_token: this.access_token
          }
        }).then(function (response) {
          if (response.data.status === true) {
            return response.data.data;
          } else {
            return response.data;
          }
        })["catch"](function (error) {
          console.log(error);
          return {
            status: false,
            msg: null
          };
        });
      } else {
        return {
          status: false,
          code: "NO_VALID_ACCESS_TOKEN",
          message: "Cannot complete request, no valid access token"
        };
      }
    }
    /**
     * Retrieves all the files this user has access to
     * provided your app is granted explicit permission
     */

  }, {
    key: "getUserFiles",
    value: function getUserFiles() {
      if (this.access_token !== null) {
        return axios({
          url: GB_API_SERVER + "/user-files",
          method: "POST",
          data: {
            access_token: this.access_token
          }
        }).then(function (response) {
          if (response.data.status === true) {
            return response.data.data;
          } else {
            return response.data;
          }
        })["catch"](function (error) {
          console.log(error);
          return {
            status: false,
            msg: null
          };
        });
      } else {
        return {
          status: false,
          code: "NO_VALID_ACCESS_TOKEN",
          message: "Cannot complete request, no valid access token"
        };
      }
    }
  }]);

  return greenbii;
}();

exports.greenbiisdk = greenbii;