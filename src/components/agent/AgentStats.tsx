
export const AgentStats = () => {
  return (
    <div className="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-600">$500M+</div>
        <p className="text-sm text-gray-500">Sales Volume</p>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-600">150+</div>
        <p className="text-sm text-gray-500">Homes Sold</p>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-600">4.9★</div>
        <p className="text-sm text-gray-500">Client Rating</p>
      </div>
    </div>
  );
};
