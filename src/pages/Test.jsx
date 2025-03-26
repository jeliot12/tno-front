import { useState, useEffect } from 'react';

const Test = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = 'http://localhost:4000'
  const userId = 3
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/test/clans/${userId}/avatar`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return null;
    return `${API_URL}${avatarPath}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm mx-auto">
      <div className="flex flex-col items-center">
        {/* Avatar */}
        <div className="mb-4">
          {user.avatarUrl ? (
            <img
              src={getAvatarUrl(user.avatarUrl)}
              alt={`${user.username}'s avatar`}
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
              onError={(e) => {
                e.target.src = '/default-avatar.png'; // Путь к дефолтной аватарке
                e.target.onerror = null;
              }}
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-4xl">👤</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Test;
