import { Spin } from "antd";

export default function Spinner() {
	return (
		<div className="fixed top-0 left-0 w-[100%] h-screen bg-black/20 z-50 flex justify-center items-center">
			<div className="bg-white rounded-lg h-[7rem] w-[8rem] flex justify-center items-center">
				<Spin tip="Loading" size="large"></Spin>
			</div>
		</div>
	);
}
