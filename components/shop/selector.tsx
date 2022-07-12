interface Props {
  selector: string;
  handleChange: any;
}

const Selector = ({selector, handleChange}: Props) => {
  return (
    <div className="col-span-9 flex items-center justify-start">
      <span className="mr-2 text-sm">Sort by:</span>
      <select
        value={selector}
        onChange={handleChange}
        className="border-2 border-stone-200 rounded-full px-4 py-2 text-sm">
        <option value="latest">Latest</option>
        <option value="most-solds">Most solds</option>
        <option value="low-high">Price: Low - High</option>
        <option value="high-low">Price: High - Low</option>
      </select>
    </div>
  );
};

export default Selector;
