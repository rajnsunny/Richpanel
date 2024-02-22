import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { pageState, profileState } from "../../atoms/atom";
import Sidebar from "../../components/base/Layout/Sidebar";

import { getAccount, getProfile } from "../../api/account";

function Dashboard() {
	const {session, loading} = useSession();
	const [active, setActive] = useState("");
	const [page, setPage] = useRecoilState(pageState);
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
	return (
		<div>
			<Sidebar active={active} setActive={setActive} /> 
			<Sidebar active='conv' />
			
		</div>
	);
}

export default Dashboard;
