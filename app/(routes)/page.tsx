import getBillboard from "@/actions/get-billboard";
import { getProducts } from "@/actions/get-products";
import Billboard from "@/components/billboard";
import ClientProductList from "@/components/client-product-list";
import Container from "@/components/ui/container";


export const revalidate = 0;
const HomePage = async () => {
    const products = await getProducts({});
    const billboard = await getBillboard("d0d0dc3a-8839-42f9-ae8c-f351ed9b30ad");

    return(
        <Container>
            <div className="space-y-10 pb-10">
            <Billboard data={billboard} />
            <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
            <ClientProductList title="Featured Products" items={products}/>
            </div>
            </div>
        </Container>
    );
}

export default HomePage;

