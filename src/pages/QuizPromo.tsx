import { questions } from "@/components/Quiz/questions/index";
import { ArrowRight, Clock, Heart, Mail } from "lucide-react"

const features = [
  { icon: Clock, title: "Environ 3 minutes", text: `${questions.length} questions simples, sans jargon.` },
  { icon: Heart, title: "Ton profil à toi", text: "On décode ce que ta peau essaie de te dire." },
  { icon: Mail, title: "Tes conseils par email", text: "Ton profil détaillé et 3 gestes adaptés." },
]

const QuizPromo = () => (
  <div className="min-h-screen bg-background font-body px-5 py-14">
    <div className="max-w-3xl mx-auto text-center">
      <h1 className="font-heading text-[2.4rem] md:text-[3.2rem] font-bold leading-tight mb-4">
        <span className="text-violet-deep">Et si ta peau</span><br />
        <span className="text-brand-gradient italic">pouvait parler ?</span>
      </h1>
      <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
        Fais le quiz gratuit et explore tes habitudes et les réactions que tu observes. Pas de jugement, c'est entre nous ✨
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12 text-left md:text-center">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex md:flex-col items-start md:items-center gap-3">
            <Icon className="h-6 w-6 text-primary shrink-0" />
            <div>
              <h2 className="font-heading text-xl font-semibold text-foreground">{title}</h2>
              <p className="text-sm text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>

      <a
        href="/"
        className="group bg-brand-gradient text-primary-foreground rounded-full px-8 py-4 text-[17px] font-bold shadow-glow inline-flex items-center gap-2"
      >
        Je découvre mon profil
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </a>
      <p className="text-sm text-muted-foreground mt-4">100% gratuit · environ 3 min · Sans spam</p>
    </div>
  </div>
)

export default QuizPromo
