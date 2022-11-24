import AdminBanner from "../components/AdminBanner";


export default function AdminDashboard(){
	const data = {
		title: "The Fashion Shop",
		destination1: "/products/create",
		destination2: "/products/all",
		destination3: "/users/:userId/details",
		label1: "Add New Product",
		label2: "Show All Products",
		label3: "Show User Orders",
	}

	return(
		<>
			<AdminBanner adminBannerProp={data}/>
			</>
	)
}