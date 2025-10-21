import { getServerMe } from "@/lib/api/serverApi";
import css from "./Profile.module.css";

export default async function Profile() {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          {/* <a src="" className={css.editProfileButton}>
            Edit Profile
          </a> */}
        </div>
        <div className={css.avatarWrapper}>
          {/* <img
            src="User Avatar"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          /> */}
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
}
