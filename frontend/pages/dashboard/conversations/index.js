import React from "react";
import Sidebar from "../../../Components/base/Layout/Sidebar";
import UserListing from "../../../components/Conversations/userListing";
import Conversation from "../../../components/Conversations/Conversation";
import SenderProfile from "../../../components/Conversations/senderProfile";
import { io } from "socket.io-client";
import { useSession } from "next-auth/react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
	activeConvState,
	conversationState,
	pageState,
	profileState,
} from "../../../atoms/atom";
import { setConv, setSendConv } from "../../../utils/helpers";
import { fetchProfile, getAccount, getProfile } from "../../../api/account";

const Conversations = () => {
	var socket;
	const {session, loading} = useSession();
	const [page, setPage] = useRecoilState(pageState);
	const [convState, setConvState] = useRecoilState(conversationState);
	const activeConv = useRecoilValue(activeConvState);
	const [profile, setProfile] = useRecoilState(profileState);

	React.useEffect( () => {
		async function getAccountData(){
			if (session) {
				const accounts = await getAccount(session.user.email,session.user.accessToken);
				 console.log(accounts);
				setPage(accounts.data.data.accounts[0]);
				const profile = await getProfile(session.user.email);
				const user = profile.data.data.user;
				setProfile((profile) => user);
			}
		}

		getAccountData();
	}, [session]);

	React.useEffect( () => {
		async function getConnect (){
			if (session && Object.keys(page).length) {
				socket = io("https://richpanel-assignment-6uef.onrender.com");
				configureSocket();
			}
		}
		getConnect()
	}, [session, page]);

	const configureSocket = () => {
		socket.on("connect", () => {
			socket.emit("/init", { pageId: page.id });
		});
		socket.on("connect_error", (err) => {
			console.error(err);
		});
		const newmsgCb = async (data) => {
			const user = await fetchProfile(session.user.email, data.event.sender.id);
			setConvState((convState) =>
				setConv(convState, data.event, user.data.data.details),
			);
		};
		socket.on("/new_message", newmsgCb);
	};

	return (
		<div className=''>
			<Sidebar active='conv' />
			<div className='ml-20 grid grid-cols-10'>
				<UserListing className='border-r-1 border-gray-300 border-solid col-span-2' />
				<Conversation className='col-span-5' />
			</div>
		</div>
	);
};

export default Conversations;
