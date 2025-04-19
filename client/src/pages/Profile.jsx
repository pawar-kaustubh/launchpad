import { useSelector, useDispatch } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Link } from "react-router-dom";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showStartupsError, setShowStartupsError] = useState(false);
  const [userStartups, setUserStartups] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (file) handleFileUpload(file);
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      () => setFileUploadError(true),
      () =>
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        )
    );
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (!data.success) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleShowStartups = async () => {
    try {
      setShowStartupsError(false);
      const res = await fetch(`/api/user/startups/${currentUser._id}`);
      const data = await res.json();
      if (!data.success) {
        setShowStartupsError(true);
        return;
      }
      setUserStartups(data);
    } catch {
      setShowStartupsError(true);
    }
  };

  const handleStartupDelete = async (startupId) => {
    try {
      const res = await fetch(`/api/startup/delete/${startupId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) return;
      setUserStartups((prev) =>
        prev.filter((startup) => startup._id !== startupId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-purple-400">
        Your Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          ref={fileRef}
        />
        <div className="flex justify-center mb-6">
          <img
            src={formData.avatar || currentUser.avatar}
            alt="avatar"
            className="h-32 w-32 rounded-full object-cover cursor-pointer border-4 border-purple-500"
            onClick={() => fileRef.current.click()}
          />
        </div>

        <p className="text-center text-sm mb-4">
          {fileUploadError ? (
            <span className="text-red-500">
              Error: Image upload failed (Max 2MB).
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-blue-400">Uploading {filePerc}%</span>
          ) : filePerc === 100 ? (
            <span className="text-green-400">Uploaded successfully!</span>
          ) : (
            ""
          )}
        </p>

        <input
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="text"
          placeholder="Username"
        />
        <input
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="email"
          placeholder="Email"
        />
        <input
          id="password"
          onChange={handleChange}
          className="w-full p-3 mb-4 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="password"
          placeholder="Password"
        />
        <button
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition duration-300"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
        <Link
          to="/startupform"
          className="w-full block mt-4 bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700 transition duration-300"
        >
          + Create New Startup
        </Link>
      </form>

      <div className="max-w-3xl mx-auto mt-6 flex justify-between text-sm text-red-400 font-semibold">
        <button
          onClick={handleDeleteUser}
          className="hover:text-red-500 hover:underline"
        >
          Delete Account
        </button>
        <button
          onClick={handleSignOut}
          className="hover:text-red-500 hover:underline"
        >
          Sign Out
        </button>
      </div>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {updateSuccess && (
        <p className="text-green-400 mt-4 text-center">
          Profile updated successfully!
        </p>
      )}

      <button
        onClick={handleShowStartups}
        className="block mx-auto mt-8 text-blue-400 underline hover:text-blue-500"
      >
        Show My Startups
      </button>
      {showStartupsError && (
        <p className="text-red-500 mt-2 text-center">Error loading startups.</p>
      )}

      {userStartups.length > 0 && (
        <div className="max-w-3xl mx-auto mt-6">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">
            Your Startups
          </h2>
          <div className="flex flex-col gap-4">
            {userStartups.map((startup) => (
              <div
                key={startup._id}
                className="flex items-center justify-between p-4 bg-gray-800 rounded-lg shadow-md"
              >
                <Link to={`/startup/${startup._id}`}>
                  <img
                    src={startup.coverImage[0]}
                    alt="startup"
                    className="h-16 w-16 object-cover rounded-md"
                  />
                </Link>
                <Link
                  to={`/startup/${startup._id}`}
                  className="flex-1 ml-4 text-white font-medium hover:text-purple-400 truncate"
                >
                  {startup.name}
                </Link>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartupDelete(startup._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                  <Link to={`/startup/${startup._id}`}>
                    <button className="text-green-500 hover:text-green-600">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}