import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { addUserDetails, getUserFromUsers } from "../../api/userManagement";

export default function useConfirmEmail() {
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log("User in useConfirmEmail:", user);

  useEffect(() => {
    async function finishRegistration() {
      try {
        const alreadyRegistered = await getUserFromUsers(user.id);
        if (alreadyRegistered) {
          console.log("User already registered, navigating to dashboard.");
          navigate("/dashboard");
          return;
        }

        await addUserDetails({
          name: user.user_metadata.name,
          id: user.id,
          image: user.user_metadata.image,
        });
      } catch (error) {
        console.error(error);
      }
    }

    finishRegistration();
  }, [user, navigate]);

  return { user };
}
