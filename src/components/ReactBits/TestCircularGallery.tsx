import CircularGallery from "./CircularGallery";

const TestCircularGallery = () => {
  const testItems = [
    { image: "https://picsum.photos/id/10/800/600", text: "Bridge" },
    { image: "https://picsum.photos/id/20/800/600", text: "Ocean" },
    { image: "https://picsum.photos/id/30/800/600", text: "City" },
    { image: "https://picsum.photos/id/40/800/600", text: "Forest" },
  ];

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#1B0B3A",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>
        Circular Gallery Test
      </h2>
      <CircularGallery
        items={testItems}
        bend={1}
        textColor="#ffffff"
        borderRadius={0.05}
      />
    </div>
  );
};

export default TestCircularGallery;
