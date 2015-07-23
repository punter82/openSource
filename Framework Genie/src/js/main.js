( function() {
    'use strict';
    var question_number = 1
        ;
    $( 'button' ).on( 'click' , function( evt ) {
        var _ANCHOR_OPEN_TAG = '<a href='
            , _ANCHOR_OPEN_TAG_END = '>'
            , _ANCHOR_CLOSE_TAG = '</a>'
            , breadCrumBDiv = $( '#bread-crumb' )
            , isbreadCrumbAdded = false
            ;
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();

        if( !breadCrumBDiv.html() ) {

            breadCrumBDiv.html( _ANCHOR_OPEN_TAG + '"#q' + question_number + '"' + _ANCHOR_OPEN_TAG_END + evt.target.innerHTML + _ANCHOR_CLOSE_TAG );
            isbreadCrumbAdded = true;

        } else {

            if ( breadCrumBDiv.html().indexOf( evt.target.innerHTML ) === -1 ) {

                breadCrumBDiv.html( breadCrumBDiv.html() + ' >> ' + _ANCHOR_OPEN_TAG + '"#q' + question_number + '"' + _ANCHOR_OPEN_TAG_END + evt.target.innerHTML + _ANCHOR_CLOSE_TAG );
                isbreadCrumbAdded = true;
            }

        }
        
        if( isbreadCrumbAdded ) {

            $( 'button[data-question="q' + question_number + '"]' ).addClass( 'hide' );
            $ ( evt.target ).next( 'section' ).removeClass( 'hide' );
            question_number++;
        }

    });
} ) ();

