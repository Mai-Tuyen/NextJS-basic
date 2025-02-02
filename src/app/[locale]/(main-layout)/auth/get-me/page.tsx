import authFetchRequest from "@/feature/auth/fetchRequest";
export default async function GetMe() {
  const userCurrentInfo = await authFetchRequest.getCurrentUser();
  // console.log("userCurrentInfo", userCurrentInfo);
  return (
    <>
      <div>Current user info</div>
      <h1>{userCurrentInfo?.payload?.username}</h1>
      <h1>{userCurrentInfo?.payload?.email}</h1>
    </>
  );
}
