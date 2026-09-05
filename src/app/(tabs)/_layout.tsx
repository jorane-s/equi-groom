import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#70C1B3", // Couleur d'accent active
        tabBarInactiveTintColor: "#8E8E93",
        tabBarStyle: {
          backgroundColor: "#FFF2E6", // Fond beige pastel comme sur ton mockup
          borderTopWidth: 0,
          height: 65,
          paddingBottom: 10,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="profil"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="memo"
        options={{
          title: "Mémo",
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
        }}
      />

      {/* Onglet Accueil central mis en valeur */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color }) => (
            <View className="-mt-5 bg-white p-3 rounded-full shadow-md border border-gray-100">
              <Home color="#70C1B3" size={28} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="rdv"
        options={{
          title: "Rendez-vous",
          tabBarIcon: ({ color, size }) => (
            <Calendar color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="plus"
        options={{
          title: "Plus",
          tabBarIcon: ({ color, size }) => <Menu color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
