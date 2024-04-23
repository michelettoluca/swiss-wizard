import { useLocalSearchParams } from "expo-router"
import { Text, View } from "react-native"
import { Header } from "../../../../../components/header"
import { trpc } from "../../../../../lib/trpc"
import { BASE } from "../../../../../styles/size"

export default function () {
    const { id } = useLocalSearchParams()

    const { data } = trpc.tournament.findById.useQuery({ id: Number(id) })

    return (
        <View style={{ flex: 1, padding: BASE }}>
            <Header title={data?.name ?? ""} />
            {data && <Text>{JSON.stringify(data, null, 3)}</Text>}
        </View>
    )
}
