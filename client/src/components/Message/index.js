import React, { memo, useEffect, useRef, useState } from "react";
import "./Message.scss";
import distanceInWordsToNow from "date-fns/formatDistanceToNow";
import { ru } from "date-fns/locale";
import classNames from "classnames";
import {
  CheckCircleOutlined,
  CheckOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Image, Progress } from "antd";
import converterCurrentTime from "../../utils/helpers/converterCurrentTime";
import pauseSvg from "../../images/pause.svg";
import playSvg from "../../images/play.svg";
import waveSvg from "../../images/wave.svg";
import { formatDistance } from "date-fns";
import ruLang from "date-fns/locale/ru";
export const formatDate = (date) => {
  const now = Date.parse(date);
  return formatDistance(now, new Date(), { locale: ruLang });
};

const Message = memo(
  ({
    text,
    avatar,
    // date,
    audio = false,
    user,
    isMe,
    isReaded,
    attachments,
    isTyping,
    ...props
  }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const audioElem = useRef(null);
    useEffect(() => {
      if (audio) {
        audioElem.current.addEventListener(
          "playing",
          () => {
            setIsPlaying(true);
          },
          false
        );
        audioElem.current.addEventListener(
          "ended",
          () => {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
          },
          false
        );
        audioElem.current.addEventListener(
          "pause",
          () => {
            setIsPlaying(false);
          },
          false
        );
        audioElem.current.addEventListener("timeupdate", () => {
          const duration =
            (audioElem.current && audioElem.current.duration) || 0;
          setCurrentTime(audioElem.current.currentTime);
          setProgress((audioElem.current.currentTime / duration) * 100);
        });
      }
    }, []);

    const togglePlay = () => {
      if (!isPlaying) {
        audioElem.current.play();
      } else {
        audioElem.current.pause();
      }
    };

    return (
      <div
        className={classNames("message", {
          "message--me": isMe,
          "message--is-audio": audio,
          "message--isReaded": isReaded,
          "message--isTyping": isTyping,
          "message-image": attachments && attachments.length === 1,
        })}
      >
        <div className="message__avatar">
          <Badge>
            <Avatar size={45} icon={<UserOutlined />} />
          </Badge>
        </div>
        <div className="message__content">
          {(audio || text || isTyping) && (
            <div className="message__bubble">
              {text && <p className="message__text">{text}</p>}
              {isTyping && (
                <div className="typing">
                  <span className="circle scaling"></span>
                  <span className="circle scaling"></span>
                  <span className="circle scaling"></span>
                </div>
              )}
              {audio && (
                <div className="message__audio">
                  <audio src={audio} ref={audioElem} preload="auto" />
                  <div
                    className="message__audio-progress"
                    style={{ width: progress + "%" }}
                  ></div>
                  <div className="message__audio-info">
                    <div className="message__audio-btn">
                      <button onClick={togglePlay}>
                        {isPlaying ? (
                          <img src={pauseSvg} alt="Wave svg" />
                        ) : (
                          <img src={playSvg} alt="Wave svg" />
                        )}
                      </button>
                    </div>

                    <div className="message__audio-wave">
                      <img src={waveSvg} alt="Wave svg" />
                    </div>
                    <span className="message__audio-duration">
                      {converterCurrentTime(currentTime)}
                    </span>
                  </div>
                </div>
              )}

              {/* {isMe &&
              (isReaded ? (
                <CheckCircleOutlined
                  className={classNames("check", {
                    "check-me": isMe,
                  })}
                />
              ) : (
                <CheckOutlined
                  className={classNames("check", {
                    "check-me": isMe,
                  })}
                />
              ))} */}
            </div>
          )}
          <div>
            {attachments &&
              attachments.map((i) => (
                <Image
                  width={attachments && attachments.length === 1 ? 150 : 60}
                  src={i.url}
                />
              ))}
          </div>

          <div className="message__date">{/* {formatDate()} */}</div>
        </div>
      </div>
    );
  }
);

export default Message;
