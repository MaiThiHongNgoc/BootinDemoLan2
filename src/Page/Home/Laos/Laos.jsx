import React, { useState } from "react";
import { FaYoutube } from "react-icons/fa";
// import CountUp from 'react-countup';
import './Laos.css';
import CountUp from 'react-countup';


const Laos = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
        setShowModal(true);
    };

    const closeModal = () => {
        setSelectedVideo(null);
        setShowModal(false);
    };

    return (
        <div className="laos-jsx">
            <div className="laos-full">
            </div>
            <div className="laos-vc">
                <div className="laos-col">
                    <div className="laos-vc-inner">
                        <div className="laos-apper">
                            <div className="laos-widget">
                                <div className="laos-bg-video">
                                    <div className="laos-bwp-image">
                                        <div className="laos-bwp-video" onClick={() => handleVideoClick("https://www.youtube.com/embed/7yNacyiNBkI")}>
                                            <i className="laos-youtube"><FaYoutube /></i>
                                            <div className="laos-videothumb">
                                                <img 
                                                    decoding="async" 
                                                    className="laos-img-responsive" 
                                                    src="https://wpbingosite.com/wordpress/bootin/wp-content/uploads/2019/04/banner3-7.jpg" 
                                                    alt=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="laos-modal">
                    <div className="laos-modal-content">
                        <span className="laos-close" onClick={closeModal}>&times;</span>
                        <iframe
                            width="560"
                            height="315"
                            src={selectedVideo}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Laos;
