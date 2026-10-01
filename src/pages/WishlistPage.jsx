function WishlistPage({wishlist}){
    return(
        <div>
            <h1>Wishlist</h1>

            {wishlist.map((item) => (
                <div key={item.id}>
                    {item.name}
                </div>
            ))}
        </div>
    );
}

export default WishlistPage;