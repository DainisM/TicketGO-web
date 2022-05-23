import useUserMutations from "./useUserMutations";

const useUsers = (user) => {
	const { updateUser } = useUserMutations(user);
	return {
		updateUser,
	};
};
export default useUsers;
