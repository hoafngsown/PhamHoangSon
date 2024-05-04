import FancyForm from "./components/FancyForm";
import Header from "./components/Header";

function App() {
  return (
    <section className="bg-[#f2f6f7] h-screen">
      <Header />

      <div className="my-10 pt-[90px] container mx-auto flex items-center justify-center h-full">
        <FancyForm />
      </div>
    </section>
  );
}

export default App;
