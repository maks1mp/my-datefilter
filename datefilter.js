'use strict';

// jQuery plugin for Date sorting
// Developed by Maksim Pogribnyak, 2016

(function ($) {

  $.fn.dateFilter = function (data) {
    var data_array = data.data.map(function (el) {
      return el.split(data.split_by).join('.');
    });
    var options = {
      data: data_array,
      filter_by: data.filter_by
    };
    console.log(options);
    var filterBy = {
      days: function days(arr, _days) {
        var last_week = getDate.days(_days),
            result = {};
        for (var i = 0; i < last_week.length; i++) {
          result[last_week[i]] = [];
          for (var j = 0; j < arr.length; j++) {
            if (arr[j] == last_week[i]) {
              result[last_week[i]].push(arr[j]);
            };
          };
        };
        return result;
      },
      year: function year(arr) {
        var last_year = getDate.year(),
            result = {};
        var mapping = arr.map(function (el) {
          return el.split('.')[1] + '.' + el.split('.')[2];
        });
        for (var i = 0; i < last_year.length; i++) {
          result[last_year[i]] = [];
          for (var j = 0; j < mapping.length; j++) {
            if (last_year[i] == mapping[j]) {
              result[last_year[i]].push(mapping[j]);
            };
          }
        };
        return result;
      }
    };

    var getDate = {
      days: function days(_days2) {
        var date = new Date();
        var result = [date.toLocaleDateString()];
        for (var i = 0; i < _days2 - 1; i++) {
          date.setDate(date.getDate() - 1);
          result.push(date.toLocaleDateString());
        };
        return result;
      },
      year: function year() {
        var date = new Date(),
            result = {
          monthes: [],
          years: []
        },
            monthes = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

        var month_now = date.getMonth() + 1;

        for (var i = month_now; i < monthes.length; i++) {
          result.monthes.push(monthes[i]);
          result.years.push(date.getFullYear() - 1);
        };
        for (var _i = 0; _i < month_now; _i++) {
          result.monthes.push(monthes[_i]);
          result.years.push(date.getFullYear());
        };
        var ret_data = [];
        for (var _i2 = 0; _i2 < result.monthes.length; _i2++) {
          ret_data.push(result.monthes[_i2] + '.' + result.years[_i2]);
        };
        return ret_data;
      }
    };

    var result_obj = void 0;

    switch (options.filter_by) {
      case 'week':
        result_obj = filterBy.days(options.data, 7);
        break;
      case 'month':
        result_obj = filterBy.days(options.data, 31);
        break;
      case 'year':
        result_obj = filterBy.year(options.data);
        break;
    };
    var result = {
      days:[],
      qantity:[],
    };
    for (var i in result_obj) {
      result.days.push(i);
      result.qantity.push(result_obj[i].length);
    };
    return result;
  };
})(jQuery);