export default function Footer() {
  return (
    <div className="absolute bottom-0 mb-7 md:mb-14 mx-7 md:mx-16 text-white">
      <a
        target="blank"
        className="opacity-80 text-orange-700 hover:text-amber-600 "
        href="https://www.github.com/shobky/touchfingers"
      >{`</> github`}</a>
      <p className="text-sm opacity-75 text-orange-700">
        creaetd by{" "}
        <a target="blank" href="https://www.github.com/shobky">
          Ahmed Shobky
        </a>
        .
      </p>
    </div>
  );
}
