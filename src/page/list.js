import React from "react";
import { Table, Typography } from "antd";
import { collection, getFirestore, getDocs } from "firebase/firestore";

const { Title } = Typography

const List = props => {
    const [loading, setLoading] = React.useState(true);
    const [data, setData] = React.useState([])

    React.useEffect(async () => {
        const querySnapshot = await getDocs(collection(getFirestore(), "users"));
        let newDdata = [];
        querySnapshot.forEach((doc) => {
            newDdata.push(doc.data())
        });
        setData(newDdata);
        setLoading(false);
    }, [])

    return <div style={{ margin: "30px" }}>
        <Title level={2}>List of Data </Title>
        <br />
        <Table loading={loading} dataSource={data} rowKey="id">
            <Table.Column key="first" title="Nama Depan" dataIndex="first" />
            <Table.Column key="lat" title="Nama Belakang" dataIndex="last" />
            <Table.Column key="born" title="TAhun Lahir" dataIndex="born" />
        </Table>
    </div>
}

export default List;