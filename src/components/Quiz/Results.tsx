
import { motion } from "framer-motion";
import { useQuiz } from "./QuizContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Check, Mail, Share2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export const Results = () => {
  const { state, dispatch } = useQuiz();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    setIsSubscribed(true);
    toast({
      title: "Success!",
      description: "Your personalized routine has been sent to your email.",
      duration: 5000,
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: "My Skincare Results",
        text: "I just discovered my perfect skincare routine! Take the quiz to find yours:",
        url: window.location.href,
      });
    } catch (err) {
      toast({
        title: "Sharing not supported",
        description: "Your browser doesn't support direct sharing.",
        duration: 3000,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-4"
    >
      <div className="glass rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-semibold mb-6">Your Personalized Results</h2>
        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            Based on your responses, we've created a customized skincare and
            lifestyle plan just for you.
          </p>
          
          {!isSubscribed ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1"
                />
                <Button type="submit">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Results
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                By submitting, you agree to receive skincare tips and updates.
                You can unsubscribe at any time.
              </p>
            </form>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <Check className="w-5 h-5" />
              <span>Check your inbox for your personalized routine!</span>
            </div>
          )}
        </div>
      </div>

      <Button
        onClick={handleShare}
        variant="outline"
        className="w-full card-hover"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share Your Results
      </Button>
    </motion.div>
  );
};
