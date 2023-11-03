import { useState, useRef, useEffect } from "react";

function IframeComponent(props: any) {
    let [urlToCall, setUrlToCall] = useState("User");

    useEffect(() => {
        if (props.nickname) {
            // setNickname(props.nickname);
            console.log(props.nickname)
            // setUrlToCall(`http://localhost:8000/$$connect$$${props.nickname}`)
            setUrlToCall(`http://tvbktnz.cluster030.hosting.ovh.net/$$connect$$${props.nickname}`)
            // setUrlToCall(`http://tvbktnz.cluster030.hosting.ovh.net/`)
          } else {
          setUrlToCall(`http://localhost:8000/$$connect$$User`)
        }
    }, []);

    console.log("IframComponent - components/site/chat - urlToCall => ", urlToCall)

    return (
        <div className="h-max">
            <iframe
                title="Chat"
                width="1000px"
                height="1000px"
                //   src="https://www.youtube.com/embed/3GzeZXFz4tU"
                //   src="http://tvbktnz.cluster030.hosting.ovh.net/"
                src={urlToCall}
                // src="http://localhost:8000"
                frameBorder="0"
                allowFullScreen={true}
                style={{ border: "none" }}
            ></iframe>
        </div>
    );
}

export default IframeComponent;
