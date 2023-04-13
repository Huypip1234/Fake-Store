import React, {memo} from "react";
// react router
import { useRouteError } from "react-router-dom";
// Antd
import { Result } from "antd";

const Error_page = () => {
	console.log("Error page render");
	const error: any = useRouteError();
	console.error(error);

	return (
		<div className="h-screen flex justify-center">
			<Result
				status="error" // Mã tương ứng hình ảnh hiển thị
				title={error.status} // Hiển thị
				subTitle={error.statusText} //Hiển thị
			/>
		</div>
	);
};

export default memo(Error_page);
