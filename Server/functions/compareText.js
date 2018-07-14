
var dandelion = require("node-dandelion");
dandelion.configure({
    "app_key":"e39378da14dc4d7b9fba017ff8f30ef5",
    "app_id":"e39378da14dc4d7b9fba017ff8f30ef5"
});

// Vergleiche Strings auf Ähnlichkeit
dandelion.txtSim(
    {
        "string1": {
            "type":"txt",
            "value":"Reports that the NSA eavesdropped on world leaders have \"severely shaken\" relations between Europe and the U.S., German Chancellor Angela Merkel said."
        },
        "string2":{
            "type":"txt",
            "value":"Germany and France are to seek talks with the US to settle a row over spying, as espionage claims continue to overshadow an EU summit in Brussels."
        },
        "lang":"en",
        "bow":"never"
    },
    function(results){
        console.log(results);
        /***** RESULTS: *****
         { time: 2,
         similarity: 0.4987,
         lang: 'en',
         timestamp: '2015-04-24T15:46:09.625' }
         **********/
    }
);