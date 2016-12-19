/* transcript.js */

(function($){

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *          NOTE - READ THIS ENTIRE FILE BEFORE YOU START DOING ANYTHING
     *            MUCH OF WHAT IS DESCRIBED HERE IS ALREADY DONE FOR YOU!
     *
     *          THE GOAL IS TO HELP YOU UNDERSTAND AND RECOGNIZE THE
     *            STRUCTURE AND DESIGN OF JQUERY PLUGINS, AS WELL AS TO
     *            HELP YOU UNDERSTAND JWPLAYER AND VIDEO APPLICATION APIs
     *
     *  Our jQuery Collections plugin, 'playerConnect', acts on a collection
     *  of HTML elements that represent the transcript to be the selection
     *  passed by jQuery. It also expects one argument - the jwplayer object
     *  that represents the player that's been initialized in the page.
     *
     *  Each HTML element must have
     *  two attributes: data-start and data-dur. These are numbers (floats)
     *  which reflect the matching time range (in seconds) from the
     *  video.
     *
     *  HTML Example:
     *  <span class="words" data-start="17.869" data-dur="3.82">Hey this is
          Dwayne Johnson. While playing astronaut Chuck Baker in the film Planet</span>
        <span class="words" data-start="21.689" data-dur="0.701">51</span>
        <span class="words" data-start="22.39" data-dur="3.56">I gained a lot of
          respect for our nation's space program. NASA makes new</span>
     *
     *  This plugin will do two things.
     *
     *      1) It will attach an onTime handler
                 (http://support.jwplayer.com/customer/portal/articles/1413089-javascript-api-reference#seek)
     *         to the player which
     *         iterates over the selected transcript elements, and
     *         applies the 'hilite' class if the time position of the player
     *         is within the time range defined by the data-start and
     *         data-dur attributes of the element. Accordingly, if the
     *         element is not in the specified range, we remove any
     *         'hilite' class.
     *
     *      2) It will attach a click hander to each transcript element
     *         which gets that element's start time from data-start and
     *         calls player.seek() with that time as its argument.
     *
     *     The result is that as the video plays, the part of the transcript
     *     that's being spoken will highlight, and a user clicking on any
     *     transcript text will cause the video to play the relevant segment.
     *
     *
     */
    $.fn.playerConnect = function(player){

      var startCode = 0; var endCode = 0;
      player.onPlay(function(evt){
        startCode = Date.now();
        console.log(startCode);
      });

      player.onComplete(function(evt){
        endCode = Date.now();
        console.log(endCode);
        console.log("Interval is "+(endCode - startCode).toString());
      });

        // Here, 'this' is the collection selected by jQuery. Let's
        //  assign it to a local variable so we have access to it
        //  from other functions and handlers inside this plugin.
        var transcriptElements = this;

        //To start with we are not assuming which segment is playing
        var currIndex = -1;

        // Here we define our function that will run every time the player
        //  updates its "position" property. 'onTime' is an event that is triggered
        //  by the player continually as the video plays. This will happen many times
        //  per second while the video is playing.
        player.onTime(function(evt){

                /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
                 *
                 *  Follow the prompts in these comments to structure your code. Read them carefully.
                 */

                 /* Get the current time of the video playback and assign it to the variable 'time'.
                  *  It is a property of the player's evt object. Refer to the classroom lecture, or use the
                  *  documentation of onTime at
                  *     http://support.jwplayer.com/customer/portal/articles/1413089-javascript-api-reference#seek
                  *  to see the properties available within this event object. (Note that the 'duration' property
                  *  of the JWPlayer onTime event is not related to the duration described by the transcript element
                  *  in our HTML, and you will not need to use it.)
                  *
                  * */
                
                var time =  evt.position; //YOUR CODE TO ADD #2 - replace the empty quotes with your code
                //console.log(time);       // see if it's working

                //Detect going past or before the start of any voice or subtitles
                var startOfAudio = parseFloat($(transcriptElements[0]).attr('data-start'));
                var nTranscripts = transcriptElements.length;
                var endOfAudio = parseFloat($(transcriptElements[nTranscripts-1]).attr('data-start'));
                endOfAudio += parseFloat($(transcriptElements[nTranscripts-1]).attr('data-dur'));

                /*  Next you need to iterate over the transcriptElements (using a 'for' loop or
                 *   transcriptElements.each()), and for each one, see if the 'time' is greater
                 *   than the element's data-start and less than the end
                 *   ('end' being equal to data-start plus data-dur).  The jquery .attr() function
                 *   will be useful here.
                 *
                 *  If the player time is in range use jQuery's addClass() to add the "hilite" class
                 *   to the element. Otherwise, use removeClass() to remove it. ".hilite" is already defined
                 *   in the stylesheet, so you don't have to manipulate the element styles themselves.
                 *
                 *  Remember that the attribute values are going to come to you as Strings
                 *   and you'll need to change them into Floats or Integers (parseFloat(), parseInt()).
                 *   Don't worry about non-numeric data or missing attributes - it's OK to assume that
                 *   the data in the HTML is valid.
                 *
                 *   in pseudo-code it's something like this:
                 *      for each transcript element
                 *          if (time >= element_start_time && time <=element_end_time)
                 *             add "hilight" class
                 *          else
                 *             remove "hilite" class
                 *
                 *   Note that the 'transcriptElements' array variable is already defined (line 43) and
                 *   contains the array of <SPAN> elements. You just have to iterate and do the rest
                 */

                // YOUR for() loop or transcriptElements.each() goes here...
                //console.log(transcriptElements);
                // YOUR CODE TO ADD #3
                jQuery.each(transcriptElements, function(index, item) {
                    //console.log(index, item);
                      // do something with `item` (or `this` is also `item` if you like)
                      //If voice has not started or it has ended then do no hiliting
                      if ((time <startOfAudio)  || (time > endOfAudio))
                      {
                          if (currIndex != -1)
                          {
                              //console.log(transcriptElements[currIndex]);
                              $(transcriptElements[currIndex]).removeClass('hilite');
                              currIndex = -1;
                          }
                          return this;
                      }

                    //If this is within the voice range, then check where to hilite
                    var startTime = parseFloat($(this).attr('data-start'));
                    var duration = parseFloat($(this).attr('data-dur'));
                    if ((time >= startTime) && (time <= (startTime + duration)))
                    {
                        if (currIndex != index)
                        {
                            //Index is changing - remove the hilite
                            if (currIndex != -1)
                            {
                                //console.log(transcriptElements[currIndex]);
                                $(transcriptElements[currIndex]).removeClass('hilite');
                            }

                            currIndex = index;
                            //console.log('Found new index ', index);
                            $(this).addClass( 'hilite');
                            return this;
                        }
                    }
                });


        });

        // player.onComplete(function(evt){
        //     if (currIndex != -1)
        //     {
        //         console.log(transcriptElements[currIndex]);
        //         $(transcriptElements[currIndex]).removeClass('hilite');
        //         currIndex = -1;
        //     }
        //
        // });

        /*
         * Here we attach a click handler to each HTML object that jQuery has provided to us
         * The handler will be a function that calls player.seek(), passing the
         * the start time from the data-start attribute
         *
         * And of course we return it, so our plugin is chainable
         * */
        return this.click(function(evt){

                // YOUR CODE TO ADD #4
                //   Get the value of the data-start attribute (the jQuery .attr() function could help here)
                //   and call player.seek([your value goes here])
                //console.log(this);
                var durationStart = parseFloat($(this).attr('data-start'));
                //console.log(durationStart);
                player.seek(durationStart);
                return this;

       });
   };

})(jQuery);


// We always use $(document).ready() to be sure the DOM has loaded
//  before we execute any JS that references the DOM
$(document).ready(function(){

    /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
     *  YOUR CODE TO ADD #1
     *
     *  Add the media player here and assign it to the 'player' variable.
     *  A few details about the player config:
     *      * Use the DIV with id="playerDiv" as the target for your player
     *      * make your width 640 and your height 480
     *      * set controls to true
     *      * the media file is at http://www.people.fas.harvard.edu/~lbouthillier/nasa-spinoffs.mp4
     *      *   You will be able to access it via the URL, even if you're running your
     *      *   code from the local filesystem. There's no need to download it.
     *      *
     *   Documentation of basic player embedding is described in Step 2 on the page at
     *   http://support.jwplayer.com/customer/portal/articles/1406723-mp4-video-embed
     *
     * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

   //add the media player
   //  YOUR CODE TO ADD #1 (already done for you)
   var player = jwplayer("playerDiv").setup({
                    file: "http://courses.dce.harvard.edu/~cscie3/examples/week13/nasa-spinoffs.mp4",
                    height: 360,
                    width: 640,
                    controls:true,
                });

    // Like with $(document).ready(), we use player.onReady to be sure the
    //   player is loaded before we try to do anything with it
   player.onReady(function(){

        //  Here we call our jQuery plugin, playerConnect, which expects the
        //   collection of HTML elements that contains the transcript. In this
        //   case it's all the SPANs with class="words"
        $('.words').playerConnect(player);

    });

});
