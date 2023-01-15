import Template from "../templates/Template";
import ReservationForm from "../components/ReservationForm"
import Cards from "../components/Cards";

const Home = () => {
    return(
    <Template>
        <ReservationForm />
        <Cards />
    </Template>
    )
}

export default Home;