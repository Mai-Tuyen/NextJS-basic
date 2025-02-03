import authFetchRequest from "@/feature/auth/fetchRequest";
export default async function GetMe() {
  const userCurrentInfo = await authFetchRequest.getCurrentUser();
  return (
    <>
      <div>Current user info</div>
      <h1>{userCurrentInfo?.payload?.username}</h1>
      <h1>{userCurrentInfo?.payload?.email}</h1>
    </>
  );
}
