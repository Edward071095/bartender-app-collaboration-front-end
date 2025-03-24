import { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router";

import { UserContext } from '../../contexts/UserContext';

import styles from '../../css-styling/Dashboard.module.css';

import userService from '../../services/userService.js';

const Dashboard = () => {
  const { user, setUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const [creators] = useState([
    {
      id:1,
      name:'Halsey Swetzoff',
      role: 'Team Member',
      bio: 'Halsey is a full stack developer who enjoys building applications from the ground up. He has a background in business that informs his approach to achieving positive outcomes for all stakeholders.',
      githubUrl: 'https://github.com/HalsSwetz',
    },
    {
      id:2,
      name: 'Derrik Youmans',
      role: 'Team Member',
      bio: 'Junior Software Developer with practical problem-solving skills honed in warehouse logistics and education. Current General Assembly bootcamp student specializing in user-centered full-stack development. Blends operational insights from diverse work experience with technical expertise to build efficient applications and deliver results.',
      githubUrl: 'https://github.com/Dyoumans1',
    },
    {
      id:3,
      name:'Edward Washington',
      role: 'Team Member',
      bio: 'Edward Washington is a junior software developer with a passion for building clean, user-friendly applications. Ed enjoys turning ideas into reality and the constant process of learning new technologies. Ed specializes in full stack development and is well versed in front end and back end development. Ed is currently a student at General Assembly soon to be a graduate, and enjoys being apart of the process that brings digital experiences to life.',
      githubUrl: 'https://github.com/Edward071095',
    },
    {
      id:4,
      name: 'Haaben Kidanu',
      role: 'Team Member',
      bio: 'Haaben Kidanu is a full-stack developer with a background in UX/UI design, who is passionate about creating seamless and efficient digital experiences. Starting with user-centric design and expanding into the technical foundations of building scalable applications, his transition into full-stack development was a natural progression. His goal is to bridge the gap between design and development, ensuring that not only do products look great, but they function flawlessly.',
      githubUrl: 'https://github.com/haaben-exe',
    }
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Welcome, {user?.username}</h1>
      
      <section className={styles.creatorsSection}>
        <h2 className={styles.creatorsTitle}>Meet Our Team</h2>
        <p className={styles.creatorsDescription}>
        Selected talents from General Assembly collaborating on our first team project. Created just two months into our immersive 480-hour development course, this application showcases our collective expertise and diverse skill sets working in harmony.
        </p>

        <div className={styles.creatorsGrid}>
          {creators.map((creator) => (
            <div key={creator.id} className={styles.creatorCard}>
              <div className={styles.creatorInfo}>
                <h3 className={styles.creatorName}>{creator.name}</h3>
                <h4 className={styles.creatorRole}>{creator.role}</h4>
                <p className={styles.creatorBio}>{creator.bio}</p>
              {/* =================================================================== */}
                {/* This is code copied from GithubIconSVG by Kharioki
                    for turning our individual Github links into github icons*/}
                {creator.githubUrl !== 'replace' && (
                  <a 
                    href={creator.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                  >
                    <svg 
                      className={styles.githubIcon} 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="24" 
                      height="24" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" 
                        fill="#ffffff" 
                      />
                    </svg>
                  </a>
                )}
                {/* =================================================================== */}
                </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className={styles.usersSection}>
      <h2 className={styles.sectionTitle}>Users</h2>
      <p className={styles.description}>
        This is the dashboard page where you can see a list of all the users.
      </p>
      <ul className={styles.userList}>
        {users.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
      </section>

      <div className={styles.buttonGroup}>
        <button 
          className={`${styles.button} ${styles.secondary}`} onClick={() => {
            handleSignOut();
            navigate('/');
        }}
      >
          Sign Out
        </button>
      </div>
    </main>
  );
};

export default Dashboard;
