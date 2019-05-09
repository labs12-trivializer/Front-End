import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';
import Tilt from 'react-tilt';

import { Container, Form, Avatar } from '../styles/profile.css';
import { Background } from '../styles/shared.css';

import { fetchProfile, editProfile } from '../actions';

const Profile = ({ profile, fetchProfile, editProfile }) => {
  useEffect(() => {
    console.log('avatarid:', profile.avatar_id);
    if (!profile.avatar_id) fetchProfile();
  }, [profile.avatar_id, fetchProfile]);

  let widget = window.cloudinary.createUploadWidget(
    { cloudName: 'trivializer', uploadPreset: 'ntufdwhu' },
    (err, result) => {
      if (result && result.event === 'success') {
        console.log('Widget upload complete?', result);
        editProfile({
          avatar_id: result.info.public_id
        });
      }
    }
  );

  const displayWidget = () => {
    widget.open();
  };

  return (
    <Container>
      <Background />
      <Tilt className="Tilt" options={{ max: 30 }}>
        <Avatar onClick={displayWidget} className="Tilt-inner" avatar={profile.avatar_id}>
          {profile.avatar_id ? (
            <Image cloudName="trivializer" publicId={profile.avatar_id} />
          ) : (
            <img src="https://picsum.photos/100" alt="placeholder" />
          )}
          <div className="middle">
            <span className="text">Upload Photo</span>
          </div>
        </Avatar>
      </Tilt>
      <Form>
        <div>
          <label htmlFor="profile-name">Name</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="profile-email">Email</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="profile-oldpass">Old Password</label>
          <input type="password" />
        </div>
        <div>
          <label htmlFor="profile-newpass">New Password</label>
          <input type="password" />
        </div>
        <button>Save</button>
      </Form>
    </Container>
  );
};

const mapStateToProps = ({ profile }) => ({ profile });

export default connect(mapStateToProps, { fetchProfile, editProfile })(Profile);
