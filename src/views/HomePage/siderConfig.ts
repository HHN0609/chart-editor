import { UserOutlined, BarChartOutlined, ClusterOutlined, TableOutlined, DotChartOutlined } from "@ant-design/icons-vue";

export default [
    {
        key: "1",
        name: "Projects",
        icon: BarChartOutlined,
        routeName: "MyProject"
    },
    {
        key: "2",
        name: "Profile",
        icon: UserOutlined,
        routeName: "MyProfile"
    },
    {
        key: "3",
        name: "Management",
        icon: ClusterOutlined,
        routeName: "Manage"
    },
    {
        key: "4",
        name: "DataPreview",
        icon: TableOutlined,
        routeName: "DataPreview"
    },
    {
        key: "5",
        name: "DataDraw",
        icon: DotChartOutlined,
        routeName: "DataDraw"
    }
]