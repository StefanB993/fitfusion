function Logo({ size = 10 }) {
  const style = {
    width: `${size}rem`,
  };
  return (
    <img
      style={style}
      src="https://fdrjcrrrxwntvbtcheks.supabase.co/storage/v1/object/sign/logo/logo.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV82NWFlZmE1Yy05MGQzLTQ1MDAtODlkZC1hOWFmYzcwYzZkZTYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJsb2dvL2xvZ28ucG5nIiwiaWF0IjoxNzU3Mjc2MTMzLCJleHAiOjE3ODg4MTIxMzN9.Zrsh5KPGwkUMg1oiyRMHIP44GEGYrPRlEby16E0U-yc"
      alt=""
    />
  );
}

export default Logo;
