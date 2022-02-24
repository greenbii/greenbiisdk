"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var axios = require('axios');

var GB_API_SERVER = "https://api.greenbii.com/sdk/v1"; //"http://localhost:8087/sdk/v1";  //"https://api.greenbii.com/v1"
//const isBrowser = require('./check_browser');

module.exports = function () {
  var status = false;
  var statusMessage = null;
  var business_details = null;
  var current_user_details = null;
  var access_token = null;
  /**
   * Initializes the greenbii platform object
   * @param {*} options {request_access_token|string, api_key|string} 
   * @returns Promise<boolea>
   */

  var connect = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
      var dt;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;

              if (!(localStorage === undefined || window === undefined)) {
                _context.next = 4;
                break;
              }

              statusMessage = {
                code: "UNSUPPORTED_PLATFORM",
                message: "Only browser platform is support for this SDK at the moment"
              };
              return _context.abrupt("return", false);

            case 4:
              _context.next = 10;
              break;

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              statusMessage = {
                code: "UNSUPPORTED_PLATFORM",
                message: "Only browser platform is support for this SDK at the moment"
              };
              return _context.abrupt("return", false);

            case 10:
              if (!(typeof options.api_key === 'undefined')) {
                _context.next = 13;
                break;
              }

              statusMessage = {
                code: "NO_API_KEY",
                message: "API key no provided, unable to initialize Greenbii App Module"
              };
              return _context.abrupt("return", false);

            case 13:
              if (!(typeof options.access_token === 'undefined')) {
                _context.next = 16;
                break;
              }

              statusMessage = {
                code: "NO_ACCESS_TOKEN",
                message: "No access token is available for this request"
              };
              return _context.abrupt("return", false);

            case 16:
              if (!(localStorage.getItem("__gb_user") !== null)) {
                _context.next = 22;
                break;
              }

              dt = JSON.parse(localStorage.getItem("__gb_user"));
              this.access_token = dt.access_token;
              this.current_user_details = dt.user;
              this.business_details = dt.business_details;
              return _context.abrupt("return", true);

            case 22:
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
                  this.business_details = response.data.data.business_details;
                  this.current_user_details = response.data.data.user;
                  this.access_token = response.dara.data.access_token; //write the content of the file in storage

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

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 6]]);
    }));

    return function connect(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  /**
   * Retrieves the contacts this user has access to
   * provided your app is granted explicit permission
   */


  var getUserContacts = function getUserContacts() {
    if (this.access_token !== null) {}

    this.statusMessage = {
      code: "NO_VALID_ACCESS_TOKEN",
      message: "Cannot complete request, no valid access token"
    };
    this.status = false;
  };
};

module.exports = greenbii;