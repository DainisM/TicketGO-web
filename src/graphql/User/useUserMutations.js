import { ObjectId } from "bson";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

export default function useUserMutations(user) {
	return {
		updateUser: useUpdateUser(user),
	};
}

const UpdateUserMutation = gql`
	mutation updateUser($userId: ObjectId!, $updates: UserUpdateInput!) {
		updatedUser: updateOneUser(query: { _id: $userId }, set: $updates) {
			_id
			_partition
			first_name
			last_name
		}
	}
`;

function useUpdateUser(user) {
	const [updateUserMutation] = useMutation(UpdateUserMutation);
	const updateUser = async (user, updates) => {
		const { updatedUser } = await updateUserMutation({
			variables: { userId: user._id, updates },
		});
		return updatedUser;
	};
	return updateUser;
}
