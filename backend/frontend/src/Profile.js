import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";

const API_BASE_URL = "http://localhost:5000";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: ""
  });
  const [updateLoading, setUpdateLoading] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view your profile");
        return;
      }

      const response = await fetch(`${API_BASE_URL}/api/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setFormData({
          username: data.user.username,
          email: data.user.email
        });
      } else {
        setError(data.error || "Failed to fetch profile");
        // If token is invalid, redirect to login
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdateLoading(true);
    setUpdateMessage("");
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/api/users/${user.id}`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setUpdateMessage("Profile updated successfully!");
        setEditMode(false);
        // Update localStorage with new user data
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        setError(data.error || "Failed to update profile");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading">Loading profile...</div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="profile-container">
        <div className="error-message">{error}</div>
        <Link to="/login" className="btn btn-primary">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <h1 className="profile-title">👤 My Profile</h1>
          <p className="profile-subtitle">Manage your account settings</p>
        </div>

        {error && <div className="error-message">{error}</div>}
        {updateMessage && <div className="success-message">{updateMessage}</div>}

        <div className="profile-content">
          <div className="profile-info">
            <div className="info-item">
              <label>Username:</label>
              <span>{user.username}</span>
            </div>
            <div className="info-item">
              <label>Email:</label>
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <label>Member since:</label>
              <span>{new Date(user.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {editMode ? (
            <form onSubmit={handleUpdateProfile} className="edit-form">
              <h3>Edit Profile</h3>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={updateLoading}
                >
                  {updateLoading ? "Updating..." : "Save Changes"}
                </button>
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => {
                    setEditMode(false);
                    setFormData({
                      username: user.username,
                      email: user.email
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-actions">
              <button 
                onClick={() => setEditMode(true)}
                className="btn btn-primary"
              >
                ✏️ Edit Profile
              </button>
              <button 
                onClick={handleLogout}
                className="btn btn-danger"
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>

        <div className="profile-footer">
          <Link to="/home" className="link">← Back to Home</Link>
        </div>
      </div>
    </div>
  );
}
