!function () {
    'use strict';

    $(document).ready(function () {
        var finalDate = moment('2017-09-30T19:00:00+02:00');
        var now = moment().unix();

        $('div#clock-wrapper').FlipClock(finalDate.unix() - now, {
            clockFace: 'DailyCounter',
            countdown: true
        });
    });
}();
