
function RecentlyViewed({ products }){
    return(
        <div>
            <h2>Recently Viewed</h2>
            {products.map((product) => (
                <div key={product.id}>
                    {product.title}
                </div>
            ))}

            
        </div>
    );
}

export default RecentlyViewed;