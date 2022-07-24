import React, {Fragment, useState, useEffect, useLayoutEffect, useRef} from "react";


function StoryGlyph( {title, story, author, emotions} ){

    return (
        <Fragment>
        <div id="overlay">
            <h3 class="title is-6">{ title }</h3>
            <p>{story}</p>
            {/* <br /> */}
            <span class="is-pulled-right">-{author}</span><br/>
        </div>
        </Fragment>
    )
}

export default StoryGlyph;