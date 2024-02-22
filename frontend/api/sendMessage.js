import axios from "axios";

const sendMessage = async (email, message, recipientId) => {
	const res = await axios.post(
		`https://richpanel-assignment-6uef.onrender.com/api/webhook/${email}/send_message`,
		{
			recipientId,
			message,
		},
	);
	if (res.status != 200) {
		console.log("Some error occured");
	}
};

export { sendMessage };
