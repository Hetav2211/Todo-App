import { MdSentimentVerySatisfied, MdLightbulb, MdStars } from "react-icons/md";

const Welcomemsg = () => {
  return (
    <div className="text-center py-16 px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <MdSentimentVerySatisfied className="text-3xl text-white" />
        </div>

        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          All caught up! 🎉
        </h3>

        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          You have no pending tasks. Time to relax or add something new to
          accomplish!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <MdLightbulb className="text-yellow-500" />
            <span>Stay productive</span>
          </div>
          <div className="flex items-center gap-2">
            <MdStars className="text-purple-500" />
            <span>Enjoy your day</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcomemsg;
