(function ($) {

    /* ============================================= */
    /* ==== GOOGLE MAP ==== */

    function initmap() {
        if (($(".ct-js-googleMap").length > 0) && (typeof google === 'object' && typeof google.maps === 'object')) {
            $('.ct-js-googleMap').each(function () {
                var atcenter = "";
                var $this = $(this);

                var offset = -30;

                if (validatedata($this.data("offset"))) {
                    offset = $this.data("offset");
                }

                var $drag = true;

                if(device.mobile() || device.tablet() || ($devicewidth < 768)){
                    $drag = false;
                }

                function evts(idx) {
                  path = 'https://www.google.com/maps/dir/?api=1&destination=' + [
                    '19.02671,73.418124',
                    '18.742062,73.410793',
                    '18.752072,73.443965',
                    '18.6859820,73.4420090'
                  ][idx]
                  return {
                    click: function () {
                      window.open(path);
                    }
                  }
                }

                if (true) {
                    $this.gmap3({
                        marker: {
                          values: [
                            { address: "19.02671,73.418124", events: evts(0) },
                            { address: "18.742062,73.410793", events: evts(1) },
                            { address: "18.752072,73.443965", events: evts(2) },
                            { address: "18.6859820,73.4420090", events: evts(3) },
                          ]
                        },
                        map: {
                            options: {
                                //maxZoom:11,
                                zoom: 10,
                                center:[18.77,73.43],
                                mapTypeId: google.maps.MapTypeId.ROADMAP, // ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
                                //scrollwheel: false,
                                //disableDoubleClickZoom: false,
                                draggable: $drag, //disableDefaultUI: true,
                                mapTypeControlOptions: {
                                    //mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
                                    //style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                                    //position: google.maps.ControlPosition.RIGHT_CENTER
                                    mapTypeIds: []
                                }
                            }, events: {
                                idle: function () {
                                    if (!$this.data('idle')) {
                                        $this.gmap3('get').panBy(0, offset);
                                        $this.data('idle', true);
                                    }
                                }
                            }
                        },
                        //},"autofit"
                    });

                    // center on resize
                    google.maps.event.addDomListener(window, "resize", function () {
                        setTimeout(function () {
                            $this.gmap3('get').setCenter(atcenter);
                            $this.gmap3('get').panBy(0, offset);
                        }, 400);

                    });

                    // set height
                    $this.css("min-height", $this.data("height") + "px");
                }

                if ($this.parent().parent().hasClass('hidemap')) {
                    $this.parent().animate({height: '0px'}, 500);
                }

            })
        }

    }

    initmap();
})(jQuery);
