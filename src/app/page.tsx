import AuthScreen from "@/components/home/auth-screen/AuthScreen";
import HomeScreen from "@/components/home/home-screen/HomeScreen";

export default function Home() {
  const user = false;


  return (
    <main>
      {user ? <HomeScreen /> : <AuthScreen />}
    </main>
  );
}
