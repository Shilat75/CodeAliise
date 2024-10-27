import React from "react";
import ChatBox from '../../components/ChatBox/ChatBox';
const ProfileBio = ({ currentProfile, currentUser }) => {
  console.log(currentUser, currentProfile)
  return (
    <div>
      <div>
        {currentProfile?.tags.length !== 0 ? (
          <>
            <h4>Tags watched</h4>
            {currentProfile?.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </>
        ) : (
          <p>0 tags watched</p>
        )}
      </div>
      <div>
        {currentProfile?.about ? (
          <>
            <h4>About</h4>
            <p>{currentProfile?.about}</p>
          </>
        ) : (
          <p>No bio found</p>
        )}
        {
          (currentProfile != null && currentUser != null && currentUser?.result._id != currentProfile._id) &&
          <ChatBox to={currentProfile} from={currentUser} ></ChatBox>
        }

      </div>
    </div>
  );
};

export default ProfileBio;
